
export function handleAccess = () => {
  setShowAccess(true);
  console.log('accsess');
};

export function handleBack = () => {
  setShowAccess(false);
  setShowBack(false);
  console.log('back');
};

export function handleSell = () => {
  setShowBack(true);
  console.log('sell');
};

export function handleSetPrice = () => {
  setShowBack(true);
  console.log('set price');
};

export function handleTransferOwnership = () => {
  setShowBack(true);
  console.log('Transfer Ownership');
};

export function handleAttachGame = () => {
  setShowBack(true);
  console.log('Attach Game');
};

export function handleNftBuy = async () => {
  console.log('Buy NFT');
  
};

export function handlePlay = async () => {
  console.log('Play Game');
};
