<template>
  <div class="notice inline visible info">
    <div class="noticeMsg">
      This field is not editable yet. Please fill out the Job Types field above first, so that appropriate employees can be listed below.
    </div>
    <div class="noticeClose">
      <span class="material-symbols-outlined">warning</span>
    </div>
  </div>
  <ul class="employeeDataList">
    <li>
      <div class="employeeDataWrapper skeletonize">
        <div class="employeeName"><span class="skeletonBlock"></span></div>
        <div class="employeeDataFields">
          <ul>
            <li class="employeeDataField">
              <div class="employeeJobTitle"><span>Title: </span><span class="skeletonBlock"></span></div>
              <div class="employeeJobBaseWage"><span>Base Wage: </span><span class="skeletonBlock"></span></div>
              <div class="employeeJobBasePoints"><span>Base Points: </span><span class="skeletonBlock"></span></div>
            </li>
            <li class="employeeDataField">
              <div class="employeeJobTitle"><span>Title: </span><span class="skeletonBlock"></span></div>
              <div class="employeeJobBaseWage"><span>Base Wage: </span><span class="skeletonBlock"></span></div>
              <div class="employeeJobBasePoints"><span>Base Points: </span><span class="skeletonBlock"></span></div>
            </li>
          </ul>
        </div>
      </div>
    </li>
    <li>
      <div class="employeeDataWrapper skeletonize">
        <div class="employeeName"><span class="skeletonBlock"></span></div>
        <div class="employeeDataFields">
          <ul>
            <li class="employeeDataField">
              <div class="employeeJobTitle"><span>Title: </span><span class="skeletonBlock"></span></div>
              <div class="employeeJobBaseWage"><span>Base Wage: </span><span class="skeletonBlock"></span></div>
              <div class="employeeJobBasePoints"><span>Base Points: </span><span class="skeletonBlock"></span></div>
            </li>
            <li class="employeeDataField">
              <div class="employeeJobTitle"><span>Title: </span><span class="skeletonBlock"></span></div>
              <div class="employeeJobBaseWage"><span>Base Wage: </span><span class="skeletonBlock"></span></div>
              <div class="employeeJobBasePoints"><span>Base Points: </span><span class="skeletonBlock"></span></div>
            </li>
          </ul>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: "EmployeeDataSkeleton",
  created() { },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped></style>