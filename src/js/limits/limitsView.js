function limitsRenderItems() {
    let items = window.itemDefinitions;
    if (!items) {
        // TODO: error handling
        return
    }
    const itemLimitsViewDiv = document.getElementById("itemLimitsView");
    itemLimitsViewDiv.innerHTML = "";
    const form = document.createElement("form");
    form.id = "itemLimitsForm";
    for (const item of Object.keys(items)) {
        const id = "limit-" + item.replace(" ", "-");
        const an = items[item].acceptableNumbers;
        
        const div = document.createElement("div");
        div.id = id;
        div.setAttribute("data-value", item);

        const span0 = document.createElement("span");
        span0.innerHTML = `${item}`
        span0.classList = "itemLimitsView-spacer";
        
        const span1 = document.createElement("span");
        span1.innerHTML = " is limited to ";

        const singlePurchaseLabel = document.createElement("label");
        singlePurchaseLabel.htmlFor = id + "-singlePurchaseLabel";
        const singlePurchaseInput = document.createElement("input");
        singlePurchaseInput.id = id + "-singlePurchaseInput";
        singlePurchaseInput.type = "number";
        singlePurchaseInput.value = an.perSingleTransaction;
        
        const span2 = document.createElement("span");
        span2.innerHTML = ` purchases in a single transaction or `

        const perTimeIntervalLabel = document.createElement("label");
        perTimeIntervalLabel.htmlFor = id + "-perTimeIntervalLabel";
        const perTimeIntervalInput = document.createElement("input");
        perTimeIntervalInput.id = id + "-perTimeIntervalInput";
        perTimeIntervalInput.type = "number";
        perTimeIntervalInput.value = an.perTimeInterval;

        const span3 = document.createElement("span");
        span3.innerHTML = ` purchases over `;

        const timeIntervalLabel = document.createElement("label");
        timeIntervalLabel.htmlFor = id + "-timeIntervalLabel";
        const timeIntervalInput = document.createElement("input");
        timeIntervalInput.id = id + "-timeIntervalInput";
        timeIntervalInput.type = "number";
        timeIntervalInput.value = an.timeDescription.split(" ")[0];
        
        const select = document.createElement("select");
        select.id = id + "-timeIntervalSelect";
        select.innerHTML = `
            <option>Seconds</option>
            <option>Minutes</option>
            <option>Hours</option>
            <option>Days</option>
            <option>Weeks</option>
        `;
        select.value = an.timeDescription.split(" ")[1];

        div.appendChild(span0);
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