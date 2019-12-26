"use strict";

const runSize = 10;

const main = async (input) => {
    console.log("begin");
    for await (const value of input) {
        console.log("begin sub");
        await asyncLog(value);
        console.log("end sub");
    }
    console.log("end");
}

const asyncLog = async (input) => {
    await wait(1000);
    console.log(input)
}

const asyncIter = {
    [Symbol.asyncIterator]: () => {
        const items = Array.from(Array(runSize).keys());
        return {
            next: () => Promise.resolve({
                done: items.length === 0,
                value: items.shift()
            })
        }
    }
}

const syncIter = {
    [Symbol.iterator]: () => {
        const items = Array.from(Array(runSize).keys());
        return {
            next: () => ({
                done: items.length === 0,
                value: items.shift()
            })
        }
    }
}

const wait = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

main(asyncIter).then(_ => console.log("finished"))
