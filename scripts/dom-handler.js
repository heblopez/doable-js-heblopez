const DOMHandler = function (parentSelector) {
  const parent = document.querySelector(parentSelector);

  if (!parent) throw new Error("Parent not found");

  return {
    module: null,
    load(module) {
      this.module = module;
      parent.innerHTML = module;
      module.addListeners();
    },
  };
};

export default DOMHandler;
