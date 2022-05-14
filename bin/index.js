const fs = require('fs')
let graphql = require('graphql/language')

// const
const ENDLINE = '\n'
const TAB = '\t'
const GRAPH_TYPES = ['Bytes', 'Int', 'String', 'Boolean', 'ID', 'BigDecimal', 'BigInt']

const createMermaid = (fileName) => {
  try {
    const buffer = fs.readFileSync(fileName)
    const schema = buffer.toString()
    let json = graphql.parse(schema)
    let str = 'classDiagram' + ENDLINE
    let relSTR = ''
    let rel = []

    // iterate all the entities
    json.definitions.forEach((element) => {
      // header of the class
      str = str.concat(`class ${element.name.value} { ${ENDLINE}`)

      // type of the entity
      switch (element.kind) {
        case 'InterfaceTypeDefinition':
          str = str.concat(TAB + '<<interface>>' + ENDLINE)
          break
        case 'EnumTypeDefinition':
          str = str.concat(TAB + '<<enumeration>>' + ENDLINE)
          break
      }

      if (element.fields != undefined && element.fields.length != 0) {
        //Itearate all the fields of the entity
        element.fields?.forEach((field) => {
          // relationS
          let relation = getRelation(field)
          if (relation != '') rel.push(element.name.value + '--' + getRelation(field))

          let type = getType(field)
          str = str.concat(`${TAB}${type} ${field.name.value} ${ENDLINE}`)
        })
      } else if (element.values != undefined && element.values != 0) {
        // iterate enumerator
        element.values.forEach((value) => {
          str = str.concat(`${TAB}${value.name.value} ${ENDLINE}`)
        })
      } else if (element.interfaces != undefined && element.interfaces != 0) {
        // relations with interfaces
        let relation = getRelation(field.interfaces[0])
        if (relation != '') rel.push(element.name.value + '--' + getRelation(field))
      }

      str = str.concat('}', ENDLINE)
    })

    // filter duplicates
    rel = rel.filter((item, index) => rel.indexOf(item) === index)

    //generate the relations string
    rel.forEach((element) => {
      relSTR = relSTR.concat(element + ENDLINE)
    })

    fs.writeFileSync('schema.mmd', str + relSTR)
  } catch (err) {
    console.log(err)
  }
}

const getRelation = (field) => {
  if (field.type.kind == 'NonNullType') {
    return getRelation(field.type)
  } else if (field.type.kind == 'ListType') {
    return getRelation(field.type)
  } else if (field.type.kind == 'NamedType') {
    if (GRAPH_TYPES.includes(field.type.name.value)) {
      return ''
    }
    return field.type.name.value
  } else {
    return ''
  }
}

const getType = (field) => {
  if (field.type.kind == 'NonNullType') {
    return getType(field.type) + '!'
  } else if (field.type.kind == 'ListType') {
    return '[' + getType(field.type) + ']'
  } else if (field.type.kind == 'NamedType') {
    return field.type.name.value
  } else {
    return ''
  }
}

createMermaid('schema.graphql')
