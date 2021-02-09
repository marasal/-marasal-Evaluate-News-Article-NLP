function handleSubmit(event) {
    event.preventDefault();

    let formText = document.getElementById("ArticleURL").value;
    console.log("::: Form Submitted :::");

    const isUrlValid = require("url-validation");
    console.log(isUrlValid(formText));

    if (isUrlValid(formText)) {
        postData("http://localhost:8081/api", { url: formText }).then(function (response) {
            //updat UI
            document.getElementById("Articleresults").innerHTML = `
            <strong>Agreement:</strong> ${response.agreement.toLowerCase()} 
            <br>
             Subjectivity: ${response.subjectivity.toLowerCase()}
            <br>
             Confidence: ${response.confidence}
             <br>
             Global Polarity: ${response.score_tag}
             <br><br> `;
            document.getElementById("interpretation").innerHTML =
                " <strong>Polarity values interpretation:</strong>   <li> P+: strong positive  </li> <li> P: positive  </li> <li> NEU: neutral  </li> <li> N: negative  </li> <li> N+: strong negative  </li> <li> NONE: without sentiment </li>";
        });
    } else {
        alert("Article URL is invalid");
    }
}

/* Function to POST data */
const postData = async (url = "", data = {}) => {
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    try {
        return await response.json();
    } catch (error) {
        console.log("error", error);
    }
};

export { handleSubmit };
