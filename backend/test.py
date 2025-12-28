import tensorflow as tf

model = tf.keras.models.load_model("../ml/models/cnn_from_scratch.keras")
print(model.input_shape)