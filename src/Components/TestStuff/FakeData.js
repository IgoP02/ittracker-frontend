import { faker } from "@faker-js/faker";

 //test states and logic
 const repTypes = ["Software", "Hardware", "Services", "Network"];
 const repStates = ["Pending", "Issued", "Solved", "Closed"];
 console.log(Math.round((Math.random() * 10) / 2 - 1));

 function getRandomEntry(array) {
    return array[Math.round(Math.random() * (3 - 0) + 0)];
  }
  const usedNums = []

const randomNum = (min,max)=>{
  const rand = Math.round(Math.random() * (max-min) + min)
  if( usedNums.includes(rand)){
   rand = Math.round(Math.random() * (max-min) + min)  
  }
  return rand;
}
function FakeData() {
    
    let rows = [];
    for (let index = 0; index < 20; index++) {
     rows.push({
         id:randomNum(0,1000),
         department:faker.commerce.department(),
         type:getRandomEntry(repTypes),
         issue:faker.lorem.words(3),
         description:faker.lorem.lines(2),
         status:getRandomEntry(repStates),
         priority:randomNum(1,5),
         date: faker.date.recent(10).toString()
        }
        );
    }
    return rows;
}
 
export default FakeData;

