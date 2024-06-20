const tel_input =
  document.getElementsByTagName("td")[num].childNodes[0].nodeValue;

const result = await fetch(
  `http://34.22.80.21/api/orders/orders?oid=${orderId}`,
  {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
    bodys: {
      receiver: "${name}",
      phoneNumber: "${tel_input}",
    },
  }
).then((x) => x.json());
