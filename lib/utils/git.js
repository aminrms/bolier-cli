import supabase from "../../supabase/index.js";
import chalk from "chalk";
export async function getRepos() {
  try {
    const { data, error } = await supabase
      .from("repos")
      .select("*")
      .order("name", { ascending: true });
    if (error) {
      throw error;
    }
    return data;
  } catch (err) {
    console.error(chalk.red(err));
  }
}
