// Declare a generator function with function*

function* myGenerator() {
    // yield will pause and exit the function

    yield true;
    yield 100;
    yield "Hello!";
}

// Generator functions are stored in a variable as
// an instance of the function

const goDogGo = myGenerator();
// .next calls the generator function
console.log(goDogGo.next());
console.log(goDogGo.next());
console.log(goDogGo.next());
console.log(goDogGo.next());

function* getSwitch() {
    while(true) {
        yield 'on';
        yield 'off';
    }
}

const toggle = getSwitch();
console.log(toggle.next().value); // 'on'
console.log(toggle.next().value); // 'off'
console.log(toggle.next().value); // 'on'

let response = 3;
console.log(typeof response == "number");