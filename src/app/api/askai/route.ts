import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/db/db' 
import { addnewtask } from '@/tools/tools'
import { GoogleGenAI ,FunctionCall  } from '@google/genai';
import { Todo } from '@/model/todo';
export const POST = async (req: NextRequest) => {
 try {
        const {userquery} = await req.json()
        let tool_used = false;
        const ai = new GoogleGenAI({
           apiKey: process.env.NEXT_PUBLIC_API_Gemni_Api_key,
        });
        let response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: ` User query is ${userquery} 
            context:-
            Your are a Ai Assistant which can help user to add task , get task detail , delete task , update task , sumaarize task
            , most important task .... User can ask you to do anything
            `,
            config: {
              tools: [{
                functionDeclarations: [addnewtask],
              }],
            },
          });
          console.log("this is the response-->",response.functionCalls ) 
          if(response.functionCalls && response.functionCalls.length > 0){
            tool_used = true;
            const funcCall: FunctionCall = response.functionCalls[0];
            if (funcCall.name === 'add_new_task') {
              await connectDB();
              const { task, aigenerated_description } = funcCall.args as {
                task: string;
                aigenerated_description: string;
              };
      
              await Todo.create({
                task,
                aigenerated_description,
                user:"Arpit"
              });
            }
          }

          if (tool_used) {
            response = await ai.models.generateContent({
              model: 'gemini-2.5-flash',
              contents: `
                role: user, user query is ${userquery}
                role: assistant, assistant response is assistant chose the tool add_new_task
                tool used: add_new_task (task, aigenerated_description) saved to db

                context:-
                The assistant has chosen to use the tool "add_new_task" to save a task to the database.

                Tool used: add_new_task with parameters (task, aigenerated_description).

                 Please provide a response confirming that the tool function was executed successfully, including a brief summary of the added task.
              `,
            });
          }
          return NextResponse.json({
            success:true,
            res:response,
            data:response.text
          })

 } catch (error) {
    return NextResponse.json({
        success:false,
        error: error
    })
 }
}