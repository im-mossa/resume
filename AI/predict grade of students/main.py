import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression

data =pd.read_csv('./data/student-mat.csv', sep=';')
# print(data)
data = data[['G1', 'G2', 'G3', 'studytime', 'failures', 'absences']]
# print(data.head())
x = data.drop(columns=['G3']).values.tolist()
y = data['G3'].tolist()
# print(x)
# print(y)
best_accuracy = 0
best_model = None
for i in range(50):
    x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.1, random_state=20)
    # print(y_test)
    model = LinearRegression()
    model.fit(x_train, y_train)
    accuracy = model.score(x_test, y_test)
if accuracy > best_accuracy:
    best_accuracy = accuracy
    best_model = model

print(f'Best Accuracy: {best_accuracy}')
print(f'==========================')
results = best_model.predict(x_test)
for i in range(len(results)):
    print(f'student: {x_test[i]} Predicted: {results[i]}, Actual: {y_test[i]}')