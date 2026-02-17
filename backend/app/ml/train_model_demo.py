"""Lightweight demo trainer that doesn't use pandas — produces a RandomForest model (joblib).
This is intended as a fallback/demo when building pandas/numpy on Windows is problematic.
"""
import os
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from joblib import dump

print("Starting demo training (no pandas).")
# Synthetic dataset
rng = np.random.default_rng(42)
N = 2000
taskHours = rng.uniform(0, 10, N)
idleHours = rng.uniform(0, 8, N)
social = rng.uniform(0, 5, N)
breakFreq = rng.integers(0, 8, N)
tasksCompleted = rng.integers(0, 25, N)

X = np.column_stack([taskHours, idleHours, social, breakFreq, tasksCompleted])
# Scoring function (same as README) and classification
score = (taskHours * 8) + (tasksCompleted * 5) - (idleHours * 6) - (social * 7) - (breakFreq * 2)

def score_to_label(s):
    # 0: Fake, 1: Moderately Productive, 2: Highly Productive
    if s >= 80:
        return 2
    if s >= 50:
        return 1
    return 0

y = np.array([score_to_label(s) for s in score])

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

clf = RandomForestClassifier(n_estimators=100, random_state=42)
clf.fit(X_train, y_train)
acc = clf.score(X_test, y_test)
print(f"Demo model accuracy on synthetic test set: {acc:.3f}")

out_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', 'random_forest_model.joblib'))
# Ensure parent dir exists
os.makedirs(os.path.dirname(out_path), exist_ok=True)
dump(clf, out_path)
print(f"Saved demo model to: {out_path}")
