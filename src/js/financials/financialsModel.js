/* 
  These are quick, temporary functions for calculating 
  bonuses. They will probably be reused in some way
  in the future "Finances" tab.
*/

function financialsGetSalaries () {
  const salaryTransactions = transactionsByType?.salary || [];
  window.salaryByID = {};
  window.salaryTotalAllEmployees = 0;
  if (salaryTransactions.length > 0) {
    salaryTransactions.forEach(salaryTransaction => {
      let id = salaryTransaction.initiatorID;
      if (!salaryByID[id]) {
        salaryByID[id] = {
          id: id,
          name: salaryTransaction.initiatorName,
          totalSalary: salaryTransaction.amount
        };
      } else {
        salaryByID[id].totalSalary += salaryTransaction.amount;
      }
      salaryTotalAllEmployees += salaryTransaction.amount;
    });
  }
  return salaryByID;
}
function financialsGetBonusesByPrc (bonusPrc = 0) {
  let salaryByID = financialsGetSalaries();
  let totalOfAllBonuses = 0;
  console.log(`Calcuated bonuses for employees at ${bonusPrc * 100}%:`);
  for (id in salaryByID) {
    if(!id) continue;
    let person = salaryByID[id];
    let totalBonus = (person.totalSalary * bonusPrc);
    totalOfAllBonuses += totalBonus;
    // console.log(`${person.id} ${person.name} has earned a bonus of $${totalBonus}`, person.totalSalary, salaryByID[id]);
    console.log(`${person.id} ${person.name} has earned $${person.totalSalary} for a bonus of $${totalBonus}`);
  }
  console.log(`Total of all bonuses: $${totalOfAllBonuses}`);
}
function financialsGetBonusesByTotal (bonusTotal = 0) {
  let salaryByID = financialsGetSalaries();
  let totalOfAllBonuses = 0;
  console.log(`Calcuated bonuses for employees with $${bonusTotal} available for bonus payouts:`);
  for (id in salaryByID) {
    if(!id) continue;
    let person = salaryByID[id];
    let totalBonus = (person.totalSalary / salaryTotalAllEmployees) * bonusTotal;
    totalOfAllBonuses += totalBonus;
    totalBonus = (Math.round(totalBonus * 100) / 100).toFixed(2)
    // console.log(`${person.id} ${person.name} has earned a bonus of $${totalBonus}`, person.totalSalary, salaryByID[id]);
    console.log(`${person.id} ${person.name} has earned a bonus of $${totalBonus}`);
  }
  console.log(`Total of all bonuses: $${totalOfAllBonuses}`);
}
function financialsGetSortedSalaries () {
  let salaryByID = financialsGetSalaries();
  let salariesArr = [];
  Object.keys(salaryByID).forEach((id) => {
    if (salaryByID.hasOwnProperty(id)) {
      salariesArr.push(salaryByID[id]);
    }
  });
  salariesArr.sort((x, y) => y.totalSalary - x.totalSalary);
  salariesArr.forEach(person => console.log(person));
}