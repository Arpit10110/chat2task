import { Type } from '@google/genai';

export const addnewtask = {
  name: 'add_new_task',
  description: 'Add a task to the database ',
  parameters: {
    type: Type.OBJECT,
    properties: {
      task: {
        type: Type.STRING,
        description: 'User input task add to the database',
      },
      aigenerated_description: {
        type: Type.STRING,
        description: 'give the ai generated description for the task',
      },
    },
    required: ['task',"aigenerated_description"],
  },
};

