class CreateScores < ActiveRecord::Migration
  def change
    create_table :scores do |t|
      t.integer :score, null: false
      t.string :name, null: false
      t.timestamps
    end
    
    add_index :scores, :score
    add_index :scores, :name
  end
end
