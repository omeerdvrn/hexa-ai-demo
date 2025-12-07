import hashlib
import time
import random
import requests
from datetime import datetime, timedelta
from typing import Dict, Optional, Any
from firebase_admin import storage

def generate_mock_image_url(job_id: str, prompt: str) -> str:
    processing_time = calculate_processing_time(prompt)
    time.sleep(processing_time)
    
    fail_percentage = random.randint(1, 10)
    
    if fail_percentage < 3:
        raise Exception("AI generation failed")
    
    seed = hashlib.md5(f"{job_id}-{prompt}".encode()).hexdigest()[:10]
    return f"https://picsum.photos/seed/{seed}/400/400"

def store_image_from_url(image_url: str, job_id: str) -> Dict[str, Any]:
    try:        
        response = requests.get(image_url, timeout=30)
        response.raise_for_status()
        image_data = response.content
        
        
        bucket = storage.bucket()

        blob_path = f"logos/{job_id}.png"
        blob = bucket.blob(blob_path)
        blob.upload_from_string(image_data, content_type="image/png")
        blob.make_public()
        
        public_url = f"https://storage.googleapis.com/{bucket.name}/{blob_path}"
        
        return {
            "resultUrl": public_url,
            "error": None
        }
    except requests.RequestException as e:
        return {
            "resultUrl": "",
            "error": f"Failed to download image: {str(e)}"
        }
    except Exception as e:
        return {
            "resultUrl": "",
            "error": f"Failed to upload image: {str(e)}"
        }

def generate_and_store_logo(job_id: str, prompt: str) -> Dict[str, Any]:
    try:
        ai_image_url = generate_mock_image_url(job_id, prompt)
        
        return store_image_from_url(ai_image_url, job_id)
        
    except Exception as e:
        return {
            "resultUrl": "",
            "error": str(e)
        }

def validate_job_data(job_data: Dict[str, Any]) -> tuple[bool, Optional[str]]:
    if not job_data.get("prompt"):
        return False, "Missing prompt"
    
    if not job_data.get("userId"):
        return False, "Missing userId"

    return True, None

def calculate_processing_time(prompt: str) -> int:
    import random
    
    base_delay = 5
    complexity_factor = min(len(prompt) / 10, 30)
    random_factor = random.randint(0, 20)
    
    return base_delay + int(complexity_factor) + random_factor
