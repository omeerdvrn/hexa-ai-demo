import hashlib
import time
import random
from datetime import datetime
from typing import Dict, Optional, Any

def generate_mock_image_url(job_id: str, prompt: str) -> Dict[str, Any]:
    processing_time = calculate_processing_time(prompt)
    time.sleep(processing_time)
    
    fail_percentage = random.randint(1, 10)
    
    if fail_percentage < 3:
        return {
            "resultUrl": "",
            "error": "Something went wrong"
        }
    
    seed = hashlib.md5(f"{job_id}-{prompt}".encode()).hexdigest()[:10]
    result_url = f"https://picsum.photos/seed/{seed}/400/400"
    
    return {
        "resultUrl": result_url,
        "error": None
    }

def validate_job_data(job_data: Dict[str, Any]) -> tuple[bool, Optional[str]]:
    if not job_data.get("prompt"):
        return False, "Missing prompt"
    
    if not job_data.get("userId"):
        return False, "Missing userId"

    return True, None

def calculate_processing_time(prompt: str) -> int:
    import random
    
    base_delay = 10
    complexity_factor = min(len(prompt) / 10, 30)
    random_factor = random.randint(0, 20)
    
    return base_delay + int(complexity_factor) + random_factor
