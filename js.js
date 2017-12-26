function Person(name) {
  if ( !(this instanceof arguments.callee)) {
    return new Person(name)
  }
  this.name = name || "No name"
}
Person.prototype.setName =  function(name) {
  this.name = name
}

function BetterPerson(name) {
  return {
    name: name || "No name",
    setName(name) {
      this.name = name
    }
  }
}

var eky = Person()
eky.setName("Ekonash")
console.log(eky.name)

console.log(eky instanceof Person)

var ekene = BetterPerson()
ekene.setName("Ekonash")
console.log(ekene.name)

console.log(ekene instanceof BetterPerson)
