class Score < ActiveRecord::Base
  validates :score, :name, presence: true
  validates :score, numericality: true
end
