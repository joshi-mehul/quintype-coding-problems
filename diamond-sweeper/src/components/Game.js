import React, {PureComponent} from 'react'

export default class Game extends PureComponent {

  constructor () {
    super()
    this.state = {
      score: 64,
      diamondAvailable: 0,
      diamondFound: 0,
      direction: '',
      currentRow: 0,
      currentCol: 0,
      map: [
        1, 2, 2, 2, 1, 1, 2, 1,
        1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 2, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 2, 1, 1, 1, 1,
        1, 1, 1, 1, 2, 1, 1, 1,
        1, 1, 1, 1, 2, 1, 1, 1,
        1, 1, 1, 2, 2, 1, 1, 1
      ],
      open: [
        false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false,
      ]
    }
  }

  componentDidMount () {
    this.putSomeRandomness()
  }

  putSomeRandomness () {
    let { map, diamondAvailable } = this.state
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const place = Math.round(Math.random() * (2 - 1) + 1)
        if (place === 2) {
          diamondAvailable++
        }
        map[row * 8 + col] = place
      }
    }
    this.setState({map, diamondAvailable})
  }

  getTile (row, col) {
    return this.state.map[row * 8 + col]
  }
  show (row, col) {
    let { open, score, diamondFound, diamondAvailable } = this.state
    if (!open[row * 8 + col] && diamondFound !== diamondAvailable) {
      open[row * 8 + col] = true
      if (this.getTile(row, col) === 2) {
        diamondFound++
      } else {
        this.showHint(row, col);
      }
      score--
      this.setState({open, score, diamondFound, currentRow: row, currentCol: col});
    }
  }

  showHint (row, col) {
    const {map, open} = this.state;
    let control = [0, 0, 0, 0];
    let top = row - 1
    for (; top > 0; top--) {
      if (open[row * 8 + top] === true) {
        control[0] = 8
        break
      } else if (map[row * 8 + top] !== 2) {
        control[0]++
      } else {
        break
      }
    }
    if (top === row - 1 && row === 0) {
      control[0] = 8
    }
    let right = col + 1
    for (; right < 8; right++) {
      if (open[row * 8 + right] === true || col === 7) {
        control[1] = 8
        break
      } else if (map[row * 8 + right] !== 2) {
        control[1]++
      } else {
        break
      }
    }
    if (right === col + 1 && col === 7) {
      control[1] = 8
    }
    let bottom = row + 1
    for (; bottom > 8; bottom--) {
      if (open[row * 8 + bottom] === true) {
        control[2] = 8
        break
      } else if (map[row * 8 + bottom] !== 2) {
        control[2]++
      } else {
        break
      }
    }
    if (bottom === row + 1 && row === 7) {
      control[2] = 8;
    }
    let left = col - 1
    for (; left > 0; left--) {
      if (open[row * 8 + left] === true) {
        control[3] = 8
        break
      } else if (map[row * 8 + left] !== 2) {
        control[3]++
      } else {
        break
      }
    }
    if ((left === col - 1 && col === 0) || open[row * 8 + left] === true) {
      control[3] = 8
    }
    const pos = control.indexOf(Math.min(...control))
    let direction = ''
    switch (pos) {
      case 0:
        direction = 'up'
        break
      case 1:
        direction = 'right'
        break
      case 2:
        direction = 'down'
        break
      case 3:
        direction = 'left'
        break
    }
    console.log(control);
    this.setState({direction})
  }

  isOpen (row, col) {
    return this.state.open[row * 8 + col]
  }

  saveState () {
    Lockr.set('state', this.state)
  }

  resumeState () {
    const state = Lockr.get('state', this.state)
    this.setState(state)
  }

  render () {
    let boardRow = []
    for (let row = 0; row < 8; row++) {
      let boardCol = []
      for (let col = 0; col < 8; col++) {
        boardCol.push(
          <div key={row + col} className={`cell ${!this.isOpen(row, col) ? 'unknown' : ''} ${this.isOpen(row, col) && this.getTile(row, col) === 2 ? 'diamond' : ''} ${row === this.state.currentRow && col === this.state.currentCol && this.getTile(row, col) === 1 ? `arrow ${this.state.direction}` : ''}`} onClick={this.show.bind(this, row, col)}></div>)
      }
      boardRow.push(<div className={'row'} key={row}>{boardCol}</div>)
    }
    return (
      <div className={'row center'}>
        <div className={'actions'}>
          <button className={'button primary'} onClick={this.saveState.bind(this)}>Save</button>
          <button className={'button secondary'} onClick={this.resumeState.bind(this)}>Resume</button></div>

        {boardRow}
        <div>Score: {this.state.score}</div>
        <div>{this.state.diamondAvailable === this.state.diamondFound ? 'Finished' : ''}</div>
        <div>Total diamond: {this.state.diamondAvailable}</div>
        <div>Found: {this.state.diamondFound}</div>
      </div>
    )
  }
}

