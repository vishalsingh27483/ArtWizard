import subprocess
subprocess.call(['pip', 'install', '-r', 'requirements.txt'])

from flask import Flask, request, jsonify
import os
import replicate



app = Flask(__name__)
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


os.environ["REPLICATE_API_TOKEN"] = "r8_Muulh75TZFSlSk4iYHOqtaV7gBW3N9D1OPwAF"

@app.route('/generate-image', methods=['POST'])
def generate_image():
    # Get the input prompt from the request body
    data = request.json
    prompt = data.get("prompt", "")

    # Define the input for the replicate model
    input = {
        "prompt": prompt
    }

    # Run the replicate model
    output = replicate.run(
        "bytedance/sdxl-lightning-4step:5f24084160c9089501c1b3545d9be3c27883ae2239b6f412990e82d4a6210f8f",
        input=input
    )

    # Return the output as a JSON response
    return jsonify({"output": output})

if __name__ == '__main__':
    app.run(debug=True)