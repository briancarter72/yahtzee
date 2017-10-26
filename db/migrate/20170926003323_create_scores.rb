class CreateScores < ActiveRecord::Migration[5.1]
  def change
    create_table :scores do |t|
      t.integer :value
      t.belongs_to :user

      t.timestamps
    end
  end
end
