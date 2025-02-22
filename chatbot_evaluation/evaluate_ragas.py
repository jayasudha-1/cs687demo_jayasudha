# Step 1: Install Required Libraries
# Run this in your terminal or notebook:
# pip install ragas openai

# Step 2: Import Libraries
import json
import os
from datasets import Dataset
from ragas import evaluate
from ragas.metrics import (
    context_precision,
    context_recall,
    faithfulness,
    answer_relevancy
)
from langchain_openai import ChatOpenAI

# Step 3: Set OpenAI API Key
# Replace "your-openai-api-key" with your actual OpenAI API key
os.environ["OPENAI_API_KEY"] = "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"

# Step 4: Load Your Data
# Replace "data.json" with the path to your JSON file
with open("data.json", "r") as f:
    data = json.load(f)

# Prepare data for evaluation
questions = [item["question"] for item in data]
answers = [item["answer"] for item in data]
contexts = [[item["context"]] for item in data]  # Wrap context in a list for Ragas
ground_truths = [item["ground_truth"] for item in data]

# Create a Hugging Face Dataset
dataset = Dataset.from_dict({
    "question": questions,
    "answer": answers,
    "contexts": contexts,
    "ground_truth": ground_truths
})

# Step 5: Define Evaluation Metrics
metrics = [
    context_precision,
    context_recall,
    faithfulness,
    answer_relevancy
]

# Step 6: Evaluate Your Pipeline
result = evaluate(dataset, metrics)

# Step 7: Save Results to evaluation_results.json
results = []
for i in range(len(questions)):
    results.append({
        "question": questions[i],
        "answer": answers[i],
        "context_precision": result["context_precision"][i],
        "context_recall": result["context_recall"][i],
        "faithfulness": result["faithfulness"][i],
        "answer_relevancy": result["answer_relevancy"][i]
    })

with open("evaluation_results.json", "w") as f:
    json.dump(results, f, indent=4)

print("Evaluation results saved to evaluation_results.json")