const naon = {
  data () {
    return {
      name: 'satria',
      addres: 'garut'
    }
  },
  directives: {
    cantik: {
      bind: (element, binding) => {
        element.style.color = binding.value
      }
    }
  }
}

export default naon
