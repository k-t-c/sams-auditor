function limitsRenderItems(items) {
    const itemLimitsViewDiv = document.getElementById("itemLimitsView");
    const form = document.createElement("form");
    for (const item of Object.keys(items)) {
        const id = "limit" + item.replace(" ", "-");
        
        const div = document.createElement("div");
        div.id = id;
        div.setAttribute("data-value", item);
        
        const span1 = document.createElement("span");
        span1.innerHTML = `${item} is limited to `;

        const singlePurchaseLabel = document.createElement("label");
        singlePurchaseLabel.htmlFor = id + "-singlePurchaseLabel";
        const singlePurchaseInput = document.createElement("input");
        singlePurchaseInput.id = id + "-singlePurchaseInput";
        singlePurchaseInput.type = "number";
        
        const span2 = document.createElement("span");
        span2.innerHTML = ` purchases in a single transaction or `

        const perTimeIntervalLabel = document.createElement("label");
        perTimeIntervalLabel.htmlFor = id + "-perTimeIntervalLabel";
        const perTimeIntervalInput = document.createElement("input");
        perTimeIntervalInput.id = id + "-perTimeIntervalInput";
        perTimeIntervalInput.type = "number";

        const span3 = document.createElement("span");
        span3.innerHTML = ` purchases over `;

        const timeIntervalLabel = document.createElement("label");
        timeIntervalLabel.htmlFor = id + "-timeIntervalLabel";
        const timeIntervalInput = document.createElement("input");
        timeIntervalInput.id = id + "-timeIntervalInput";
        timeIntervalInput.type = "number";
        
        const select = document.createElement("select");
        select.id = id + "select";
        select.innerHTML = `
            <option>Seconds</option>
            <option>Minutes</option>
            <option>Hours</option>
            <option>Days</option>
            <option>Weeks</option>
        `;
        div.appendChild(span1);
        div.appendChild(singlePurchaseLabel);
        div.appendChild(singlePurchaseInput);
        div.appendChild(span2);
        div.appendChild(perTimeIntervalLabel);
        div.appendChild(perTimeIntervalInput);
        div.appendChild(span3);
        div.appendChild(timeIntervalInput);
        div.appendChild(select);
        form.appendChild(div);
    }
    itemLimitsViewDiv.appendChild(form);
}