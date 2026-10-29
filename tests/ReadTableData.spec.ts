import {test, expect} from '@playwright/test';


test('read table', async({page})=>{


await page.goto('https://app.thetestingacademy.com/playwright/webtable')

 // Locate the parent table element
  const table = page.getByRole('table', { name: 'Employee Management System table' });

const tableData = await page.getByRole('table', { name: 'Employee Management System table' }).evaluate((el) => {
  const headers = Array.from(el.querySelectorAll('th')).map(th => th.textContent?.trim() || '');
  const rows = Array.from(el.querySelectorAll('tbody tr'));
  
  return rows.map(row => {
    const cells = Array.from(row.querySelectorAll('td')).map(td => td.textContent?.trim() || '');
    return Object.fromEntries(headers.map((header, i) => [header, cells[i]]));
  });
});

console.log(tableData); 



console.log('*********************    Table Data       ****************************')










  // Count rows inside tbody
  const rows = table.locator('tbody tr');

  // Find the exact row containing the text 'Smartwatch'
  const targetRow = rows.filter({
    has: page.locator('td'),
   hasText: 'Product Owner'
 });

   // Extract another value from the same row (e.g., price from another cell)
  const price = await targetRow.innerText();
  console.log('Smartwatch price is:', price);








  const rowCount = await rows.count();
  console.log(`Total Rows: ${rowCount}`);
  await expect(rows).toHaveCount(10); // Assertion

  // Count columns inside thead
  const columns = table.locator('thead tr th');
  const colCount = await columns.count();
  console.log(`Total Columns: ${colCount}`);
  await expect(columns).toHaveCount(7);


  for (let i = 0; i < await rows.count(); i++) {
  const row = rows.nth(i);
  const cells = row.locator('td');
  
  for (let j = 0; j < await cells.count(); j++) {
    const text = await cells.nth(j).innerText();
    console.log(`Row ${i}, Column ${j}: ${text}`);
  }
}

//const firstRowCell = await table.locator('tbody tr').nth(0).locator('td').nth(0).innerText();
//console.log('Cell Value:', firstRowCell);


})

