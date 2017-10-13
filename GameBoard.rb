class GameBoard

  attr_reader :hitlist, :misslist

  CARRIER = :carrier
  BATTLESHIP = :battleship
  CRUISER = :cruiser
  SUBMARINE = :submarine
  DESTROYER = :destroyer

  def initialize()
    #[H][V]
    @board = Array.new(10) { Array.new(10) { :empty  }  }
    @hitlist = Array.new(17)
    @misslist = Array.new(83)
  end

  #Each ship requires a pair of (x,y) coordinates for placement
  def setupBoard(carrier, battleship, cruiser, submarine, destroyer)
    placeShip(carrier, 5, CARRIER)
    placeShip(battleship, 4, BATTLESHIP)
    placeShip(cruiser, 3, CRUISER)
    placeShip(submarine, 3, SUBMARINE)
    placeShip(destroyer, 2, DESTROYER)
  end

  def makeMove(coords)
    location = @board[coords[0]][coords[1]]
    if validMove?(coords)
      if location == :empty
        location = :miss
        @misslist.push(coords)
      else
        location = :hit
        @hitlist.push(coords)
      end
    end
  end

  def gameOver?
    shipsLeft? = false
    @board.each do |space| 
      shipsLeft? = ((space == CARRIER) ||
                         (space == BATTLESHIP) ||
                         (space == CRUISER) ||
                         (space == SUBMARINE) ||
                         (space == DESTROYER))
    end
    shipsLeft?
  end

  def shipSunk?(ship)
    shipAlive? = false
    @board.each do |space|
      shipAlive? = (space == ship)
    end
    shipAlive?
  end
      
      
  private

    def placeShip(coords, length, symbol)
      #Ship is placed horizontally
      if coords[0][0] == coords[1][0]

      #Ship is placed vertically
      elsif coords[1][0] == coords[1][1]

      end 

      # Doesn't handle invalid placement yet
    end

    def validMove?(coords)
      coords[0].between?(0,9) && 
      coords[1].between?(0,9) &&
      @board[coords[0]][coords[1]] != :hit &&
      @board[coords[0]][coords[1]] != :miss
    end

  
  
end