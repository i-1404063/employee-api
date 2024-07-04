const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Employee extends Model {
     
    }
    
    Employee.init({
          name: {
            type: DataTypes.STRING,
            allowNull: false
          },
          positionName: {
            type: DataTypes.STRING,
            allowNull: false
          },
          positionId: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          parentId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
              model: 'Employee',
              key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
          }
      }, {
          sequelize,
          modelName: 'Employee',
          tableName: 'employees',
          indexes: [
            {
              unique: false,
              fields: ['parentId', 'positionId']
            }
          ]
      });

  return Employee;
};