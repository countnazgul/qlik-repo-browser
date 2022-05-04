import { openAPI } from "./openAPI_data";

export function ninjaData() {
  const areas = [];
  const areasList = new Set();
  const data = [];

  // let temp = [];

  Object.entries(openAPI.paths).map(([key, value]) => {
    // temp.push(key.length);
    const area = key.split("/")[1].replace(/^\w/, (c) => c.toUpperCase());
    openAPI.paths[key]["Area"] = area;

    areasList.add(area);
    areas.push({ area, value, path: key });
  });

  // console.log(Math.max(...temp));

  Array.from(areasList).map((area) => {
    data.push({
      id: `${area}`,
      title: `${area} ...`,
    });
  });

  Array.from(areasList).map((area) => {
    const localData = areas
      .filter((a) => a.area == area)
      .map((c) => {
        const methods = Object.keys(c.value);
        methods.pop();
        const methodsConcat = methods.join(", ").toUpperCase();

        // const emptySpace = "\u00A0".repeat(100 - c.path.length);
        // console.log(
        //   c.path,
        //   c.path.length,
        //   emptySpace.length,
        //   emptySpace.length + c.path.length
        // );

        // "".pa GET, PUT, POST, DELETE

        // console.log(c.path.padEnd(100, "\u00A0").length);

        data.push({
          id: c.path,
          title: `${c.path.padEnd(95, "\u00A0")}${methodsConcat}`,
          parent: c.area,
          data: { ...c.value },
          // icon: `<img src="images/get_post.png" alt="background image" class="ninja-icon"/>`,
        });
      });
  });

  return data;
}

export function getDefinitionData(ref) {
  return ref.replace("#/definitions/", "");
}
