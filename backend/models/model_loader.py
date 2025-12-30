import tensorflow as tf
from pathlib import Path
import logging

logger = logging.getLogger(__name__)

BASE_DIR = Path(__file__).resolve().parent
MODEL_PATH = BASE_DIR.parent / "ml" / "models" / "cnn_fom_scratch.keras"

def load_model():
    """Load the CNN model from disk."""
    if not MODEL_PATH.exists():
        raise FileNotFoundError(f"Model not found at {MODEL_PATH}")
    
    model = tf.keras.models.load_model(str(MODEL_PATH))
    logger.info(f"Model loaded from {MODEL_PATH}")
    return model
