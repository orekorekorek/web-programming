class CreateProductions < ActiveRecord::Migration[7.1]
  def change
    create_table :productions do |t|
      t.references :product, null: false, foreign_key: true
      t.date :production_date
      t.integer :quatity

      t.timestamps
    end
  end
end
