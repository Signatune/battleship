require 'GameBoard'  
require 'json'

class Game
  
  ONE = :player_one
  TWO = :player_two

  CARRIER = :carrier
  BATTLESHIP = :battleship
  CRUISER = :cruiser
  SUBMARINE = :submarine
  DESTROYER = :destroyer

  def initialize()
    @one = GameBoard.new
    @two = GameBoard.new
    @last_player = nil
  end

  def placeShips(player_one_ships, player_two_ships)
    @one.placeShips(player_one_ships[0],
                    player_one_ships[1],
                    player_one_ships[2],
                    player_one_ships[3],
                    player_one_ships[4])
    @two.placeShips(player_two_ships[0],
                    player_two_ships[1],
                    player_two_ships[2],
                    player_two_ships[3],
                    player_two_ships[4])
  end

  def playTurn(coords, player)
    if player == ONE
      @one.makeMove(coords)
      @last_player = ONE
    elsif player == TWO
      @two.makeMove(coords)
      @last_player = TWO
    else
      #Invalid Request Data
    end
  end

  def gameState(player)
    state = [getHits(player),
             getMisses(player),
             shipSunk?(player, CARRIER),
             shipSunk?(player, BATTLESHIP),
             shipSunk?(player, CRUISER),
             shipSunk?(player, SUBMARINE),
             shipSunk?(player, DESTROYER),
             gameOver?,
             @last_player]
    state.to_json
  end

  private

    def getHits(player)
      if player == ONE
        @one.hitlist
      elsif player == TWO
        @two.hitlist
      else
        #invalid
      end
    end

    def getMisses(player)
      if player == ONE
        @one.misslist
      elsif player == TWO
        @two.misslist
      else
        #invalid
      end
    end

    def shipSunk?(player, ship)
      if player == ONE
        @one.shipSunk?(ship)
      elsif player == TWO
        @two.shipSunk?(ship)
      else
        #invalid
      end
    end


    #Returns loser, or that game isn't over
    def gameOver?()
      if @one.gameOver? && !@two.gameOver?
        ONE
      elsif @two.gameOver? && !@one.gameOver?
        TWO
      elsif !@one.gameOver && !two.gameOver?
        false
      else
        :invalid_state
      end
    end

end