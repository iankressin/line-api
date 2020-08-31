class QueueProvider {
  calculateAvarageWaiting(current, avarage = 0, totalUses: number = 0) {
    console.log('Current ', current);
    console.log('Avarage ', avarage);
    const avg = ((avarage + current) / (totalUses + 1));

    console.log('New: ', (avg / 60000));

    return (avarage + current) / (totalUses + 1);
  }
}

export default new QueueProvider();
