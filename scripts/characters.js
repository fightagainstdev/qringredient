const card = (id, count = 1) => new Array(count).fill(id);

const deck = (cards) => ({
  cards: cards.flat(),
});

const character = (name, startPutridity, id, desc, botPassiveIds, deck) => ({
  name,
  startPutridity,
  id,
  desc,
  botPassiveIds,
  deck,
});

export const allCharacters = [
  character(
    "毛茸茸的托特",
    5,
    "totter",
    "我想成为最好的巫师！",
    ["pw", "swp", "ef"],
    deck([card("w", 3), card("f", 2), card("b", 2), card("a", 2), card("y")])
  ),
  character(
    "咳嗽巫师",
    4,
    "cough",
    "我...喜欢...苍蝇...",
    ["sfp", "iap", "ef"],
    deck([card("f", 6), card("b", 3), card("a", 1)])
  ),
  character(
    "老巫师",
    5,
    "old",
    "我老而睿智...",
    ["pw", "ifp", "iwp"],
    deck([
      card("w", 2),
      card("f"),
      card("b"),
      card("s"),
      card("y"),
      card("a", 2),
      card("r"),
      card("m"),
    ])
  ),
  character(
    "自夸巫师",
    6,
    "boast",
    "我有最好的配料！",
    ["sbp", "ps", "eb"],
    deck([card("b", 4), card("y", 2), card("s", 2), card("r"), card("m")])
  ),
  character(
    "匆忙巫师",
    9,
    "haste",
    "已经太腐烂了！",
    ["pa", "sap", "ey"],
    deck([card("a", 4), card("y", 4), card("m", 2)])
  ),
  character(
    "自定义巫师",
    0,
    "custom",
    "选择你的起始配料！"
  ),
];

export const getCharacterById = (charId) =>
  structuredClone(allCharacters.find(({ id }) => id === charId));

export const getCharacterToUnlock = (fromCharId) => {
  const charIndex = allCharacters.findIndex(({ id }) => id === fromCharId);

  return allCharacters[charIndex + 1];
};
