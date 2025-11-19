import { shuffleArray } from "./utils.js";

const generatePassiveData = (
  id,
  name,
  ingredientId,
  desc,
  value,
  level,
  linkedId = ""
) => ({
  id,
  linkedId,
  getName: () => name,
  ingredientId,
  getDesc: () => desc,
  value,
  level,
});

const generateIngredientMetadata = (name, plural, id, sign) => ({
  id,
  name,
  plural,
  sign,
});

const allEffectData = [
  generateIngredientMetadata("蠕虫", "蠕虫", "w", 1),
  generateIngredientMetadata("苍蝇", "苍蝇", "f", 1),
  generateIngredientMetadata("蝙蝠", "蝙蝠", "b", 1),
  generateIngredientMetadata("蜘蛛", "蜘蛛", "s", 1),
  generateIngredientMetadata("苹果", "苹果", "a", -1),
  generateIngredientMetadata("浆果", "浆果", "y", -1),
].flatMap(({ id, name, plural, sign }) => {
  const code = `{${id.toUpperCase()}}`;
  return [
    generatePassiveData(
      `s${id}p`,
      `高级${name}药剂`,
      id,
      `你的${code}有{P}${sign > 0 ? "+" : "-"}1`,
      sign > 0 ? 1 : -1,
      1
    ),
    generatePassiveData(
      `i${id}p`,
      `低级${name}药剂`,
      id,
      `你的${code}有{P}${sign > 0 ? "-" : "+"}1`,
      sign > 0 ? -1 : 1,
      1
    ),
    generatePassiveData(
      `p${id}`,
      `中毒${name}`,
      id,
      `添加${code}时，下一个对手的配料有{P}${
        sign > 0 ? "+" : "-"
      }1`,
      "poisoned",
      2,
      `e${id}`
    ),
    generatePassiveData(
      `e${id}`,
      `${plural}专家`,
      id,
      `添加${code}时你不会输`,
      "expert",
      3,
      `p${id}`
    ),
  ];
});

export function getRandomPassives(winsCount, excludedPassiveIds) {
  const passiveLevels1 = allEffectData.filter(({ level }) => level === 1);
  const passiveLevels2 = allEffectData.filter(({ level }) => level === 2);
  const passiveLevels3 = allEffectData.filter(({ level }) => level === 3);

  let availablePassives;

  switch (winsCount) {
    case 1:
      availablePassives = [...passiveLevels1];
      break;

    case 3:
      availablePassives = [...passiveLevels1, ...passiveLevels2];
      break;

    case 5:
      availablePassives = [
        ...passiveLevels1,
        ...passiveLevels2,
        ...passiveLevels3,
      ];
      break;

    case 7:
      availablePassives = [...passiveLevels2, ...passiveLevels3];
      break;
  }

  const filteredPassives = availablePassives.filter(
    ({ id, linkedId }) =>
      !excludedPassiveIds.includes(id) &&
      !excludedPassiveIds.includes(linkedId)
  );

  const shuffled = shuffleArray(filteredPassives);
  return [shuffled[0], shuffled[1], shuffled[2]].filter(Boolean);
}

export function getPassiveById(idToFind) {
  return allEffectData.find(({ id }) => id === idToFind);
}
