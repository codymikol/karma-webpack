import SimpleModule from './simple-module'

describe('Simple Module: Load JS Module', () => {
  const simpleModule = new SimpleModule()

  it('should default the value of x to 0', () => {
    expect(simpleModule.getX()).toBe(0)
  })

  it('should set the value of x imperatively', () => {
    simpleModule.setX(2)
    expect(simpleModule.getX()).toEqual(2)
  })
})
