import hashlib
import time
import random
import requests
from typing import Dict, Any
from firebase_admin import storage


class ImageService:
    """Service class for handling image generation and storage operations"""
    
    def __init__(self, timeout: int = 30):
        self.timeout = timeout
    
    def generate_mock_image_url(self, job_id: str, prompt: str, job_service=None) -> str:
        """
        Generate a mock image URL using external service
        
        Args:
            job_id: Unique identifier for the job
            prompt: Text prompt for image generation
            
        Returns:
            URL of the generated image
            
        Raises:
            Exception: If generation fails (simulated failure rate)
        """
        try:
            processing_time = self._calculate_processing_time(prompt)
            
            sleep_intervals = max(1, processing_time // 5)
            sleep_duration = processing_time / sleep_intervals
            
            for _ in range(sleep_intervals):
                if job_service and job_service.check_cancellation(job_id):
                    raise Exception("Job cancelled")
                time.sleep(sleep_duration)
            
            if self._should_simulate_failure():
                raise Exception("AI generation failed")
            
            seed = hashlib.md5(f"{job_id}-{prompt}".encode()).hexdigest()[:10]
            image_url = f"https://picsum.photos/seed/{seed}/400/400"
            
            return image_url
            
        except Exception:
            raise
    
    def store_image_from_url(self, image_url: str, job_id: str, job_type: str) -> Dict[str, Any]:
        """
        Download and store image from URL to Firebase Storage
        
        Args:
            image_url: URL of the image to download
            job_id: Unique identifier for the job
            
        Returns:
            Dictionary containing storage result
        """
        try:
            response = requests.get(image_url, timeout=self.timeout)
            response.raise_for_status()
            image_data = response.content
            
            storage_result = self._upload_to_storage(image_data, job_id, job_type)
            return storage_result
            
        except requests.RequestException as e:
            error_msg = f"Failed to download image: {str(e)}"
            return self._create_error_result(error_msg)
        
        except Exception as e:
            error_msg = f"Failed to upload image: {str(e)}"
            return self._create_error_result(error_msg)
    
    def generate_and_store_logo(self, job_id: str, prompt: str, job_service=None) -> Dict[str, Any]:
        """
        Complete pipeline: generate image and store it
        
        Args:
            job_id: Unique identifier for the job
            prompt: Text prompt for image generation
            
        Returns:
            Dictionary containing final result
        """
        try:
            ai_image_url = self.generate_mock_image_url(job_id, prompt, job_service)
            
            if job_service and job_service.check_cancellation(job_id):
                return {"resultUrl": "", "cancelled": True}
            
            result = self.store_image_from_url(ai_image_url, job_id, "logo")
            return result
            
        except Exception as e:
            if "Job cancelled" in str(e):
                return {"resultUrl": "", "cancelled": True}
            error_msg = f"Logo generation pipeline failed: {str(e)}"
            return self._create_error_result(error_msg)
    
    
    def _upload_to_storage(self, image_data: bytes, job_id: str, job_type: str) -> Dict[str, Any]:
        """Upload image data to Firebase Storage"""
        try:
            bucket = storage.bucket()
            blob_path = f"{job_type}s/{job_id}.png"
            blob = bucket.blob(blob_path)
            
            blob.upload_from_string(image_data, content_type="image/png")
            blob.make_public()
            
            public_url = f"https://storage.googleapis.com/{bucket.name}/{blob_path}"
            
            return {
                "resultUrl": public_url,
                "error": None
            }
            
        except Exception as e:
            raise Exception(f"Storage upload failed: {str(e)}")
    
    def _calculate_processing_time(self, prompt: str) -> int:
        """Calculate simulated processing time based on prompt complexity"""
        base_delay = 5
        complexity_factor = min(len(prompt) / 10, 30)
        random_factor = random.randint(0, 20)
        
        return base_delay + int(complexity_factor) + random_factor
    
    def _should_simulate_failure(self) -> bool:
        """Determine if generation should fail (for testing purposes)"""
        fail_percentage = random.randint(1, 10)
        return fail_percentage < 3
    
    def _create_error_result(self, error_message: str) -> Dict[str, Any]:
        """Create standardized error result"""
        return {
            "resultUrl": "",
            "error": error_message
        }