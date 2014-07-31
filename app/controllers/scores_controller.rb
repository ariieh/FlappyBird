class ScoresController < ApplicationController
  def index
    @scores = Score.order("score DESC").limit(10)
    render json: @scores
  end
  
  def create
    @score = Score.new(score_params)
    @score.save
    # head :ok
    @scores = Score.order("score DESC").limit(10)
    render json: @scores
  end
  
  private
  
  def score_params
    params.permit(:score, :name)
  end
end
