const submitBtnEle = document.getElementById("submit-btn");
const resultImage = document.getElementById("result-image");
const resultMessage = document.getElementById("result-message");
submitBtnEle.onclick = function () {
  const degree = document.getElementById("degree").value;
  const age = document.getElementById("age").value;
  const locationNo = document.getElementById("location-no").checked;
  const locationYes = document.getElementById("location-yes").checked;
  const year = document.getElementById("year").value;
  const currentYear = new Date().getFullYear();
  const workExperience = currentYear - year;
  const salary = document.getElementById("salary").value;
  if (degree == 0) {
    resultMessage.innerText = "Please select your degree";
    return;
  }
  if (age == "") {
    resultMessage.innerText = "Please enter your age";
    return;
  }
  switch (locationNo) {
    case true:
      break;

    default:
      switch (locationYes) {
        case true:
          break;

        default:
          resultMessage.innerText = "Is the location of the company close to your place of residence?";
          return;
      }
  }
  if (year == "") {
    resultMessage.innerText = "Please enter the year of entering the labor market";
    return;
  }
  if (salary == "") {
    resultMessage.innerText = "Enter your proposed salary";
    return;
  }
  if (
    degree >= 3 &&
    age >= 22 &&
    age <= 35 &&
    locationYes &&
    workExperience >= 4 &&
    salary <= 20000
  ) {
    resultImage.src = "./src/img/check vector.svg.svg";
    resultMessage.innerText =
      "Congratulations, you are eligible for employment";
  } else {
    resultImage.src = "./src/img/remove vector.svg.svg";
    resultMessage.innerText =
      "Unfortunately, you do not have the necessary conditions for employment";
  }
};
