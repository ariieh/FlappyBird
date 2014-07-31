class Score < ActiveRecord::Base
  validates :score, :name, presence: true
  validates_uniqueness_of :score, scope: :name
  validates :score, numericality: true
end
