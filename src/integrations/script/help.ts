export const helpSnippet = `
// Read the current value of a variable declared as an OUTPUT in the variable list
nexus.get("some_output")

//listen on event changes from inputs
nexus.on("some_output", value => {
  //value - represents the current value
})

// Set the value of a variable declared as an INPUT in the variable list
nexus.set("some_input", 123)
`.trim()