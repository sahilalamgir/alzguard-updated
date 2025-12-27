import tensorflow as tf
from dataset import load_datasets
from model import build_cnn
from config import EPOCHS, LEARNING_RATE
import matplotlib.pyplot as plt

train_ds, val_ds = load_datasets()

normalization_layer = tf.keras.layers.Rescaling(1./255)

train_ds = train_ds.map(lambda x, y: (normalization_layer(x), y))
val_ds = val_ds.map(lambda x, y: (normalization_layer(x), y))

model = build_cnn()

model.compile(
    optimizer=tf.keras.optimizers.Adam(learning_rate=LEARNING_RATE),
    loss="sparse_categorical_crossentropy",
    metrics=["accuracy"]
)

model.summary()

model.save("cnn_from_scratch.h5")

history = model.fit(train_ds, validation_data=val_ds, epochs=EPOCHS)

plt.plot(history.history["loss"], label="train loss")
plt.plot(history.history["val_loss"], label="val loss")
plt.legend()
plt.show()
