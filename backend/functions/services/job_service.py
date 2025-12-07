from typing import Dict, Optional, Any
from firebase_admin import firestore
from .image_service import ImageService


class JobService:
    """Service class for handling job processing operations"""
    
    def __init__(self, db_client: firestore.Client):
        self.db = db_client
        self.image_service = ImageService()
    
    def validate_job_data(self, job_data: Dict[str, Any]) -> tuple[bool, Optional[str]]:
        """
        Validate job data for required fields
        
        Args:
            job_data: Dictionary containing job data
            
        Returns:
            Tuple of (is_valid, error_message)
        """
        if not job_data.get("prompt"):
            return False, "Missing prompt"
        
        if not job_data.get("userId"):
            return False, "Missing userId"
        
        job_type = job_data.get("type")
        if job_type is not None and job_type != "logo":
            return False, f"Unsupported job type: {job_type}. Only 'logo' is currently supported."

        return True, None
    
    def process_job(self, job_id: str, job_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Process a job based on its type
        
        Args:
            job_id: Unique identifier for the job
            job_data: Dictionary containing job data
            
        Returns:
            Dictionary containing processing result
        """
        try:
            is_valid, error_message = self.validate_job_data(job_data)
            if not is_valid:
                return self._create_error_result(error_message)
            
            job_type = job_data.get("type", "logo")
            
            if job_type == "logo":
                result = self.image_service.generate_and_store_logo(job_id, job_data["prompt"])
                
                if not result.get("error") and result.get("resultUrl"):
                    self._create_logo_document(job_id, job_data, result)
                    
            else:
                return self._create_error_result(f"Unsupported job type: {job_type}")
            
            return result
            
        except Exception as e:
            error_msg = f"Unexpected error processing job {job_id}: {str(e)}"
            return self._create_error_result(error_msg)
    
    def update_job_status(self, job_id: str, result: Dict[str, Any]) -> None:
        """
        Update job status in the database
        
        Args:
            job_id: Unique identifier for the job
            result: Processing result containing status and data
        """
        try:
            status = "failed" if result.get("error") else "completed"
            
            update_data = {
                "status": status,
                "updatedAt": firestore.SERVER_TIMESTAMP
            }
            
            if result.get("resultUrl"):
                update_data["resultUrl"] = result["resultUrl"]
            
            if result.get("error"):
                update_data["error"] = result["error"]
            
            self.db.collection("jobs").document(job_id).update(update_data)
            
        except Exception:
            pass
    
    def _create_logo_document(self, job_id: str, job_data: Dict[str, Any], result: Dict[str, Any]) -> None:
        """
        Create a logo document in the logos collection
        
        Args:
            job_id: Unique identifier for the job
            job_data: Original job data
            result: Generation result with storage URL
        """
        try:
            logo_data = {
                "jobId": job_id,
                "userId": job_data.get("userId"),
                "prompt": job_data.get("prompt"),
                "style": job_data.get("style", 0),
                "storageUrl": result.get("resultUrl"),
                "createdAt": firestore.SERVER_TIMESTAMP,
                "updatedAt": firestore.SERVER_TIMESTAMP,
            }
            
            logo_ref = self.db.collection("logos").document()
            logo_data["id"] = logo_ref.id
            logo_ref.set(logo_data)
            
        except Exception as e:
            pass
    
    def _create_error_result(self, error_message: str) -> Dict[str, Any]:
        """Create standardized error result"""
        return {
            "resultUrl": "",
            "error": error_message
        }