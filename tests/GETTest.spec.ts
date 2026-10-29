import { test, expect, request } from '@playwright/test';
 
test('Validate GET request', async ({ request }) => {
    const response = await request.get('https://reqres.in/api/users?page=2');
    expect(response.status()).toBe(200);


// Status code (number)
console.log(response.status());           // 200
expect(response.status()).toBe(200);

// Status text
console.log(response.statusText()); 
expect(response.statusText()).toBe('OK');      // 'OK'

// Check if status is 2xx
console.log(response.ok()); 
expect(response.ok()).toBeTruthy();             // true 

// URL that was actually requested (after redirects)
console.log(response.url());              //https://reqres.in/api/users?page=2
//expect(response.url()).toBe("//https://reqres.in/api/users?page=2");

// Response headers (object)
console.log(response.headers());          // { 'content-type': 'application/json', ... }
expect(response.headers()['content-type']).toContain('application/json');

console.log(response.headersArray());     // [{ name: 'content-type', value: 'application/json' }]

// Response body as JSON (parsed)
const json = await response.json();
expect(json).toHaveProperty('total');
expect(json.per_page).toBeGreaterThan(0);
expect(Array.isArray(json.data)).toBe(true);
expect(typeof json.data[0].id).toBe('number');
//console.log(json);

// Response body as text
const text = await response.text();
console.log(text);

// Response body as Buffer (for files, images)
const buffer = await response.body();
console.log(buffer);

console.log('=================================')

 
    const responseBody = await response.json();
    console.log(responseBody)
    //expect(responseBody.id).toBe(1);
});