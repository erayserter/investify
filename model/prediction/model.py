class Model:
    def __init__(self, model_path):
        self.model = load_model(model_path)

    def predict(self, data):
        return self.model.predict(data)
