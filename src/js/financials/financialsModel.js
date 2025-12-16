/* 
  These are quick, temporary functions for calculating 
  bonuses. They will probably be reused in some way
  in the future "Finances" tab.
*/

function financialsGetSalaries (exculdedEmployeeIDs = []) {
  const salaryTransactions = transactionsByType?.salary || [];
  window.salaryByID = {};
  window.salaryTotalAllEmployees = 0;
  window.salaryTotalEligibleEmployees = 0;
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
      if (
          exculdedEmployeeIDs.length > 0 &&
          !(exculdedEmployeeIDs.indexOf(parseInt(id)) > -1) // if this ID is not an excluded ID
        ) {
          window.salaryTotalEligibleEmployees += salaryTransaction.amount;
        }
    });
  }
  return salaryByID;
}
function financialsGetBonusesByPrc (bonusPrc = 0, ignoredIDs = []) {
  let salaryByID = financialsGetSalaries();
  let totalOfAllBonuses = 0;
  console.log(`Calcuated bonuses for employees at ${bonusPrc * 100}%:`);
  for (id in salaryByID) {
    if(!id) continue;
    if(ignoredIDs.indexOf(parseInt(id)) > 0) continue;
    let person = salaryByID[id];
    let totalBonus = (person.totalSalary * bonusPrc);
    totalOfAllBonuses += totalBonus;
    console.log(`${person.id} ${person.name} has earned $${person.totalSalary} for a bonus of $${totalBonus}`);
  }
  console.log(`Total of all bonuses: $${totalOfAllBonuses}`);
}
function financialsGetBonusesByTotal (moneyPoolForBonuses = 0, exculdedEmployeeIDs = []) {
  let salaryByID = financialsGetSalaries(exculdedEmployeeIDs);
  let totalOfAllBonuses = 0;
  let person;
  console.log(`Calcuated bonuses for employees with $${moneyPoolForBonuses} available for bonus payouts:`);
  
  for (id in salaryByID) {
    if(!id) continue;
    if(exculdedEmployeeIDs.indexOf(parseInt(id)) > -1) continue;
    person = salaryByID[id];
    let earnedBonus = (person.totalSalary / window.salaryTotalEligibleEmployees) * moneyPoolForBonuses;
    totalOfAllBonuses += earnedBonus;
    earnedBonus = (Math.round(earnedBonus * 100) / 100).toFixed(2)
    // console.log(`${person.id} ${person.name} has earned a bonus of $${totalBonus}`, person.totalSalary, salaryByID[id]);
    console.log(`${person.id} ${person.name} has earned a bonus of $${earnedBonus}`);
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
function financialsGetAdjustedBonuses (moneyPoolForBonuses = 0, excludedEmployeeIDs = []) {
  let salaryByID = financialsGetSalaries(excludedEmployeeIDs);
  let adjustedSalariesTotal = 0;
  let totalOfAllBonuses = 0;

  if (moneyPoolForBonuses < salaryByID.length) {
    console.log("Not enough money in the pool to give out as bonuses!");
    return;
  }
  const rankTierMap = {
    // the key is the tier of the rank. the adjustment is what the multiplier should be to normalize it with Initiates/Interns
    1: {
      names: ["Overseer"],
      adjustment: 0.6307
    },
    2: {
      names: ["Underseer"],
      adjustment: 0.7188
    },
    3: {
      names: ["Vanguard", "Attending"],
      adjustment: 0.835
    },
    4: {
      names: ["Specialist", "Resident"],
      adjustment: 1.0
    },
    5: {
      names: ["Operator", "Scrub"],
      adjustment: 1.0
    },
    6: {
      names: ["Initiate", "Intern"],
      adjustment: 1.0
    }
  }
  const idToTierMap = {
    100070: 1, // Sydney Rivera, Overseer
    100095: 1, // Miki Ryan, Overseer
    100103: 2, // Emmi Dalton, Underseer
    100144: 5, // Juliet Wolf, Operator
    100153: 4, // Astrid Flores, Resident
    100169: 4, // Salvatore Romano, Resident
    100207: 5, // Howard Holmes, Operator
    100277: 4, // Isabella Hartley, Resident
    100287: 5, // Katherine Devereaux, Scrub
    100320: 5, // Onyx Angel, Scrub
    100333: 4, // Joshua Corwin, Specialist
    100358: 4, // JOSE FUENTES, Resident
    100371: 6, // Daniella Carlisle, Initiate
    100384: 4, // Freya Croft, Resident
    100437: 6, // Morte Contra, Intern
    100518: 6, // Lavender Bailey, Intern
    100609: 5, // Jackson Corbit, Operator
    100697: 5, // Adrian Karlsen, Operator
    100726: 5, // Elliott Crane, Operator
    100738: 6, // Matthew Davis, Initiate
    100799: 6, // Dino Wolf, Initiate
    101142: 3, // Ginger Goldrush, Vanguard
    101264: 6, // Coomah Black, Initiate
    101454: 5, // Tommy Tsunami, Operator
    101620: 5, // Miles Ruhk, Operator
    101691: 4, // Pepper Flu, Scrub
    101782: 6, // Nathan Walkler, Initiate
    101791: 6, // Ethan McPherson-Jones, Initiate
    101804: 5, // Juiliet Valentine, Operator
    101918: 5, // Anais Etherington, Operator
    101990: 6, // Jack Skellebones Intern
    102015: 6, // Megan Saskamoose, Intern
  }
  Object.keys(salaryByID).forEach(id => {
    if (
      !(excludedEmployeeIDs.indexOf(parseInt(id)) > -1) // if the id is not in the excluded list
    ) {
      let rankTier = idToTierMap[id];
      if (!rankTier) {
        console.log(`${id} ${salaryByID[id].name} does not have an assigned rank. Using default (Initiate/Intern)`);
        rankTier = 6;
      }
      let adjustment = rankTierMap[rankTier].adjustment;
      let totalSalary = salaryByID[id].totalSalary
      let adjustedSalary = totalSalary * adjustment
      salaryByID[id].adjustment = adjustment;
      salaryByID[id].adjustedSalary = adjustedSalary;
      adjustedSalariesTotal += adjustedSalary;
      //console.log(`Debug> ${id}> Tier: ${rankTier} Adjustment: ${adjustment} Salary: ${totalSalary} Adjusted Salary: ${adjustedSalary} adjustedSalariesTotal: ${adjustedSalariesTotal}`, salaryByID[id]);
      salaryByID[id].earnedBonus = (totalSalary / window.salaryTotalEligibleEmployees) * moneyPoolForBonuses;
      salaryByID[id].earnedBonus = (Math.round(salaryByID[id].earnedBonus * 100) / 100).toFixed(2);
    }
  });
  console.log(`Calcuated bonuses for employees with $${moneyPoolForBonuses} available for bonus payouts:`);
  Object.keys(salaryByID).forEach(id => {
    if (
      !(excludedEmployeeIDs.indexOf(parseInt(id)) > -1) // if the id is not in the excluded list
    ) {
      let adjustedSalary = salaryByID[id].adjustedSalary
      let adjustedBonus = (adjustedSalary / adjustedSalariesTotal) * moneyPoolForBonuses;
      salaryByID[id].adjustedBonus = adjustedBonus;
      totalOfAllBonuses += adjustedBonus
      salaryByID[id].adjustedBonus = (Math.round(adjustedBonus * 100) / 100).toFixed(0);
      //console.log(`${id} ${salaryByID[id].name} has earned ${salaryByID[id].totalSalary}, a bonus of ${salaryByID[id].earnedBonus}, and an adjusted bonus of ${salaryByID[id].adjustedBonus}`);
      console.log(`${id} ${salaryByID[id].name} has earned an adjusted bonus of ${salaryByID[id].adjustedBonus}`);
    }
  });

  console.log("totalOfAllBonuses", totalOfAllBonuses);
  console.log("adjustedSalariesTotal", adjustedSalariesTotal);
  console.log("salaryByID:", salaryByID);
}