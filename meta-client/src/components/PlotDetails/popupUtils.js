// popupUtils.js
export const handleAccess = (setShowAccess) => () => {
  setShowAccess(true);
  console.log('access');
};

export const handleBack = (setShowAccess, setShowBack) => () => {
  setShowAccess(false);
  setShowBack(false);
  console.log('back');
};

export const handleSell = (setShowBack) => () => {
  setShowBack(true);
  console.log('sell');
};

export const handleSetPrice = (setShowBack) => () => {
  setShowBack(true);
  console.log('set price');
};

export const handleTransferOwnership = (setShowBack) => () => {
  setShowBack(true);
  console.log('transfer ownership');
};

export const handleAttachGame = (setShowBack) => () => {
  setShowBack(true);
  console.log('attach game');
};

export const handleNftBuy = (id) => async () => {
  console.log(`buy NFT with id = ${id}`);
  
};

export const handlePlay = (game) => async () => {
  console.log(`play ${game} game`);
};