import os
from datetime import datetime, timezone
from firebase_functions import firestore_fn, scheduler_fn, options
from firebase_admin import initialize_app, firestore, auth
from dotenv import load_dotenv
from utils import validate_job_data, generate_mock_image_url

load_dotenv()

DEPLOYMENT_REGION = os.getenv("DEPLOYMENT_REGION")

def get_firestore_client():
    try:
        initialize_app()
    except ValueError:
        pass
    return firestore.client()

@firestore_fn.on_document_created(
    document="jobs/{job_id}",
    region=DEPLOYMENT_REGION
)
def process_job(event: firestore_fn.Event[firestore_fn.DocumentSnapshot]) -> None:
    db = get_firestore_client()
    
    try:
        job_data = event.data.to_dict()
        job_id = event.params.get("job_id")
        
        if not job_data:
            return
        
        
        is_valid, error_message = validate_job_data(job_data)
        if not is_valid:
            db.collection("jobs").document(job_id).update({
                "status": "failed",
                "error": error_message,
                "updatedAt": firestore.SERVER_TIMESTAMP
            })
            return
        
        result = generate_mock_image_url(job_id, job_data["prompt"])
        
        status = "failed" if result.get("error") else "completed"
        
        db.collection("jobs").document(job_id).update({
            "status": status,
            "resultUrl": result.get("resultUrl"),
            "error": result.get("error"),
            "updatedAt": firestore.SERVER_TIMESTAMP
        })
    except Exception:
        pass