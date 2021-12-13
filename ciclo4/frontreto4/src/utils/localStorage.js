/**
 * @function setSession
 * @description setSession to mantain opened
 * @param {*} dataUser
 */
export function setSession(dataUser) {
  localStorage.setItem("userSession", JSON.stringify(dataUser));
}

/**
 * @function existsSession
 * @description checks is session is active or not
 * @returns boolean value
 */
export function existsSession() {
  let dataUser = JSON.parse(localStorage.getItem("userSession") ?? "{}");
  if (Object.keys(dataUser).length > 0) {
    return true;
  }
  return false;
}

/**
 * @function closeSession
 * @description closeSession deletes session from browser and redirect to Login page
 */
export function closeSession() {
  localStorage.removeItem("userSession");
}

/**
 * @function getSession
 * @description getSession get Session from localstorage
 * @returns object with session Data
 */
export function getSession() {
  return JSON.parse(
    localStorage.getItem("userSession")
      ? localStorage.getItem("userSession")
      : "{}"
  );
}

/**
 * @function setProducts
 * @description setProducts to keep products
 * @param {*} fragances
 */
export function setProducts(fragances) {
  localStorage.setItem("fragances", JSON.stringify(fragances));
}

/**
 * @function getSession
 * @description getSession get Session from localstorage
 * @returns object with session Data
 */
export function getProducts() {
  return JSON.parse(localStorage.getItem("fragances") ?? "{}");
}

export function setProductsToSell(product, idx) {
  const productObject = {
    idx: idx,
    value: product
  };

  let saveProducts = JSON.parse(localStorage.getItem("products")) ?? [];

  let idxExists = saveProducts.find((product) => product.idx === idx);

  if (idxExists) {
    idxExists.idx = idx;
    idxExists.value = product;
  } else {
    saveProducts.push(productObject);
  }

  localStorage.setItem("products", JSON.stringify(saveProducts));
}

export function setQuantitiesToSell(quantity, idx) {
  const quantityObj = {
    idx: idx,
    value: quantity
  };

  let saveQuantities = JSON.parse(localStorage.getItem("quantities")) ?? [];

  let idxExists = saveQuantities.find((quantity) => quantity.idx === idx);

  if (idxExists) {
    idxExists.idx = idx;
    idxExists.value = quantity;
  } else {
    saveQuantities.push(quantityObj);
  }

  localStorage.setItem("quantities", JSON.stringify(saveQuantities));
}

export function getQuantitiesToSell() {
  return JSON.parse(localStorage.getItem("quantities") ?? "[]");
}

export function getProductsToSell() {
  return JSON.parse(localStorage.getItem("products") ?? "[]");
}

export function clearProductsAndQuantities() {
  localStorage.removeItem("quantities");
  localStorage.removeItem("products");
}
