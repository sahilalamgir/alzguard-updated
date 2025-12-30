from PIL import Image
import numpy as np

def preprocess_image(img: Image.Image) -> np.ndarray:
    """
    Preprocess PIL Image for ML model.
    Resizes to 224x224 and normalizes to 0-1.
    """
    img = img.convert("RGB")
    img = img.resize((224, 224))
    img_array = np.array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    return img_array
