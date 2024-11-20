<template>
  <ul class="employeeDataList">
    <li v-for="(employee,id) in data">
      <div class="employeeDataWrapper">
        <div class="employeeName">
          {{ employee.firstName }} {{ employee.lastName }}
        </div>
        <div class="employeeDataFields">
          <ul>
            <li v-for="job in employee.jobTitles" class="employeeDataField">
              <div class="employeeJobTitle">
                Title: <strong>{{ job.title }}</strong>
              </div>
              <div class="employeeJobBaseWage">
                Base Wage: <strong>{{ job.baseWage.displayValue }}</strong>
              </div>
              <!-- <div class="employeeJobMinimumWage">
                Min. Wage:<input type="number" min="0" :value="job.minimumWage" @change="$emit('changed')" :name="employeeMinimumWageFieldName(id, job.title)" />
              </div> -->
              <div class="employeeJobBasePoints">
                Base Points: <input type="text" min="0" :value="job.basePoints" @change="$emit('changed')" :name="employeeBasePointsFieldName(id, job.title)" />
              </div>
              <div class="employeeJobMainJob">
                <label class="control control-checkbox"><input type="checkbox" :value="job.isMainJobTitle" :checked="job.isMainJobTitle" @change="$emit('changed')" :name="employeeMainJobTitleFieldName(id, job.title)" /> Is Main Job Title? <div class="control_indicator"></div></label>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </li>
  </ul>

  <!-- <table>
    <thead>
      <tr>
        <th>Employee</th>
        <th>Title</th>
        <th>Base Wage Paid</th>
        <th>Minimum Wage</th>
        <th>Points</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(employee, id) in data">
        <td colspan="1">{{ employee.firstName }} {{ employee.lastName }}</td>
        <td colspan="4">
          <tr v-for="job in employee.jobTitles">
            <td colspan="1">{{ job.title }}</td>
            <td colspan="1">{{ job.baseWage.displayValue }}</td>
            <td colspan="1">
              <input type="number" min="0" :value="job.minimumWage" @change="$emit('changed')"
                  :name="employeeMinimumWageFieldName(id, job.title)" />
            </td>
            <td colspan="1">
              <input type="number" min="0" :value="job.basePoints" @change="$emit('changed')"
                  :name="employeeBasePointsFieldName(id, job.title)" />
            </td>
          </tr>
        </td>
      </tr>
    </tbody>
    <tfoot></tfoot>
  </table> -->
</template>

<script>
export default {
  name: "EmployeeData",
  created() {},
  data() {
    return {};
  },
  props: {
    data:{
      type: Object,
      required: true,
      default: () => {}
    }
  },
  methods: {
    employeeBasePointsFieldName: function(id, title){
      return `employee_job_base_points[${id}][${title}][points]`;
    },
    employeeMinimumWageFieldName: function(id, title){
      return `employee_job_base_points[${id}][${title}][minWage]`;
    },
    employeeMainJobTitleFieldName: function(id, title){
      return `employee_job_main_job[${id}][${title}][isMainJob]`;
    }
  },
};
</script>

<style lang="scss" scoped></style>