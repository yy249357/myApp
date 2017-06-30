/*
* @Author: yankang
* @Date:   2017-06-30 11:23:01
* @Last Modified by:   yankang
* @Last Modified time: 2017-06-30 11:27:16
*/

'use strict';

class Animal {
    constructor(){
        this.type = 'animal'
    }
    says(say){
        console.log(this.type + ' says ' + say)
    }
}

let animal = new Animal()
animal.says('hello') //animal says hello

class Cat extends Animal {
    constructor(){
        super()
        this.type = 'cat'
    }
}

let cat = new Cat()
cat.says('hello') //cat says hello